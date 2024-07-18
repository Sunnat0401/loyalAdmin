/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Source.css";
import { Modal } from "antd";

const Source = () => {
  const token = localStorage.getItem("accesstoken");
  const baseUrl = "https://api.dezinfeksiyatashkent.uz/api/";
  const baseImgUrl = `https://api.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [source, setSource] = useState([]);
  const [category, setCategory] = useState([]);

  const [openSrc, setOpenSrc] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState();
  const [categ, setCateg] = useState('');
  const [title, setTitle] = useState();
  const [pictureSrc, setPictureSrc] = useState(null);

  //GET
  const getSource = () => {
    fetch(`${baseUrl}sources/`)
      .then((resp) => resp.json())
      .then((data) => {
        setSource(data?.data);
      });
  };

  //Category GET
  const getCat = () => {
    fetch(`${baseUrl}categories`)
      .then((resp) => resp.json())
      .then((categ) => {
        setCategory(categ?.data);
        console.log("category", categ?.data);
      });
  };

  const handleOpenSrc = () => {
    setOpenSrc(true);
  };

  const handleCloseSrc = () => {
    setOpenSrc(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  //POST
  const addSource = () => {
    const formDataSrc = new FormData();
    formDataSrc.append("title", title);
    formDataSrc.append("category", categ);
    formDataSrc.append("images", pictureSrc);
    handleOpenSrc();
    fetch(`${baseUrl}sources/`, {
      method: "POST",
      body: formDataSrc,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.success) {
          getSource();
          handleCloseSrc();
        }
      });
  };

  //DELETE
  const getDelId = (delID) => {
    handleDeleteOpen();
    console.log(delID);
  };

  useEffect(() => {
    getSource();
    getCat();
  }, []);

  return (
    <>
      <Modal
        footer={null}
        onCancel={handleDeleteClose}
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>O`chirilsinmi?</p>
              <button className="btn btn-outline-primary" onClick={handleDeleteClose}>Cancel</button>
              <button className="btn btn-primary" onClick={handleDeleteClose}>Ok</button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Add */}
      <Modal
        footer={null}
        onCancel={handleCloseSrc}
        open={openSrc}
        onClose={handleCloseSrc}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Add City</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form id="sourcesForm">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 d-flex flex-column">
                      <label htmlFor="title">*Title</label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        onChange={(e) => setTitle(e?.target?.value)}
                        id="title"
                      />
                    </div>
                    <div className="col-lg-6 d-flex flex-column">
                      <label htmlFor="category">*Category</label>
                      <select
                        className="select form-control"
                        style={{ background: "transparent" }}
                        onChange={(e) => setCateg(e.target.value)}
                      >
                        <option value="">Select a category</option>
                        {category &&
                          category.map((cat, index) => (
                            <option key={index} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <label htmlFor="picture">Upload the images</label>
                      <input
                        type="file"
                        id="picture"
                        className="form-control mt-1 mb-1"
                        onChange={(e) => setPictureSrc(e?.target?.files[0])}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button className="btn btn-outline-primary" onClick={handleCloseSrc}>
                        Cancel
                      </button>
                      <button className="btn btn-primary" onClick={addSource}>
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-primary" onClick={handleOpenSrc}>
              Add City
            </button>
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
                  source.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.title}</td>
                      <td>{item?.category_name}</td>
                      <td>
                        <img
                          src={`${baseImgUrl}${item?.src}`}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>
                        <button className="btn btn-outline-primary mx-1">
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => getDelId(item)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Source;
