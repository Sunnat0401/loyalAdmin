/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Source.css";
import { message, Modal } from "antd";

const Source = () => {
  const token = localStorage.getItem("accesstoken");
  const baseUrl = "https://api.dezinfeksiyatashkent.uz/api/";
  const baseImgUrl = `https://api.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [source, setSource] = useState([]);
  const [category, setCategory] = useState([]);

  const [openSrc, setOpenSrc] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState();
  const [categ, setCateg] = useState("");
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
  const addSource = (e) => {
    e.preventDefault();
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
          alert(data?.message);
          handleCloseSrc();
        }
      });
  };


  //PUT

  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState({title: "", categ: "", pictureSrc: null})

  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const getEditId = (item) => {
    handleEditOpen();
    setId(item?.id);
    setData({title: item?.title, categ: item?.categ, pictureSrc: item?.pictureSrc})
    console.log(item?.id);
  };
  const editFormData = new FormData();
  editFormData.append("title", data?.title);
  editFormData.append("category", data?.categ);
  editFormData.append("images", data.pictureSrc);

  const handleEditFunc = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}sources/${id}`, {
      method: "PUT",
      body: editFormData,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success) {
        console.log(data);
      }
    })
  }

  //DELETE
  const getDelId = (item) => {
    handleDeleteOpen();
    setId(item.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}sources/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((del) => {
        if (del.success) {
          const delSrc = source?.filter((data) => data?.id !== id);
          setSource(delSrc);
          message.success(delSrc?.message);
          handleDeleteClose();
        }
      });
  };

  useEffect(() => {
    getSource();
    getCat();
  }, []);

  return (
    <>
      {/* PUT */}
      <Modal
        footer={null}
        onCancel={handleEditClose}
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Tahrirlash</p>
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
                        value={data?.title}
                        onChange={(e) => setData({...data, title : e?.target?.value})}
                        id="title"
                      />
                    </div>
                    <div className="col-lg-6 d-flex flex-column">
                      <label htmlFor="category">*Category</label>
                      <select
                        className="select form-control"
                        style={{ background: "transparent" }}
                        value={data?.categ}
                        onChange={(e) => setData({...data, categ: e?.target?.value})}
                      >
                        <option disabled value="">Select a category</option>
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
                        onChange={(e) => setData({...data, pictureSrc: e?.target?.files[0]})}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleEditClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleEditFunc(e)}
                      >
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
      {/* DELETE */}
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
              <button
                className="btn btn-outline-primary"
                onClick={handleDeleteClose}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleDelete}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* POST */}
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
              <p>Qo`shish</p>
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
                        <option value="" disabled>Select a category</option>
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
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleCloseSrc}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => addSource(e)}
                      >
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
      {/* GET */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-primary" onClick={handleOpenSrc}>
              Qo`shish
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
                        <button
                          className="btn btn-outline-primary mx-1"
                          onClick={() => getEditId(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => getDelId(item)}
                        >
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
