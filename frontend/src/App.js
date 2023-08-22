import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DownloadLink from "react-download-link";
import axios from "axios";

const App = () => {
  const [allfiile, setAllfiile] = useState();
  const [file, setfile] = useState();
  useEffect(() => {
    const getFiles = async () => {
      const res = await axios.get("http://localhost:3000/all");
      console.log(res?.data?.allFiles);
      setAllfiile(res?.data?.allFiles);
    };
    getFiles();
  }, []);

  useEffect(() => {}, [allfiile]);

  const deleteHandle = async (id) => {
     await axios.get(`http://localhost:3000/delete/${id}`)
    window.location.reload();

  };

  const uploadHandle = async () => {
    const formData = new FormData();
    formData.append("uploadedfile", file);

    await axios.post("http://localhost:3000/upload", formData);
    window.location.reload();
  };
  return (
    <div className="container p-4">
      <div class="input-group mb-3 w-50">
        <input
          type="file"
          name="uploadedfile"
          onChange={(e) => setfile(e.target.files[0])}
          class="form-control"
        />
        <button class="input-group-text" onClick={uploadHandle}>
          Upload
        </button>
      </div>
      {allfiile?.map((val, index) => (
        <div className="card" style={{ width: "23rem", margin: "20px" }}>
          {val?.image?.format !== "pdf" ? (
            <img key={index} src={val?.image?.url} alt="alt" />
          ) : (
            ""
          )}
          <div className="card-body">
            <h5 className="card-title">
              {val?.image?.name}.{val?.image?.format}
            </h5>
            <DownloadLink
              className="btn btn-primary"
              type="button"
              label="Download Image"
              filename={`download.${val?.image?.format}`}
              exportFile={() =>
                fetch(val?.image?.url).then((response) => response.blob())
              }
            />
            <a className="btn btn-primary m-2" href={val?.image?.url}>
              view
            </a>
            <button
              onClick={() => deleteHandle(val?._id)}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
