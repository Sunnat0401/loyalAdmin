/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Source.css";

const Source = () => {
  const baseUrl = "https://api.dezinfeksiyatashkent.uz/api/";
  const baseImgUrl = `https://api.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [source, setSource] = useState([]);

  const getSource = () => {
    fetch(`${baseUrl}sources/`)
      .then((resp) => resp.json())
      .then((data) => {
        setSource(data?.data);
        console.log(data?.data);
      });
  };

  useEffect(() => {
    getSource();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <button className="btn btn-primary">Add City</button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Src</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {source &&
                source?.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item?.title}</td>
                    <td>{item?.category_name}</td>
                    <td>
                      <img src={`${baseImgUrl}${item?.src}`} alt="" width={100} height={100} />
                    </td>
                    <td>
                      <button className="btn btn-outline-primary mx-1">
                        Edit
                      </button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Source;
