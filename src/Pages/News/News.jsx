/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./News.css";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const News = () => {
  const token = localStorage.getItem("accesstoken");
  const baseUrl = "https://api.dezinfeksiyatashkent.uz/api/"
  const baseImgUrl = `https://api.dezinfeksiyatashkent.uz/api/uploads/images/`;
  const [news, setNews] = useState([]);



  const [open, setOpen] = useState(false);

  const handleOpenAdd = () => {
    setOpen(true);
  };
  const handleCloseAdd = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  //GET
  const getNews = () => {
    fetch(`${baseUrl}news/`)
      .then((resp) => resp.json())
      .then((data) => {
        setNews(data?.data);
      });
  };




  const [titleEn, setTitleEn] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleUz, setTitleUz] = useState();
  const [textUz, setTextUz] = useState();
  const [textRu, setTextRu] = useState();
  const [textEn, setTextEn] = useState();
  const [titleTr, setTitleTr] = useState();
  const [titleZh, setTitleZh] = useState();
  const [textZh, setTextZh] = useState();
  const [textTr, setTextTr] = useState();
  const [author, setAuthor] = useState();
  const [picture, setPicture] = useState(null);
/* 
  console.log("titleEn", titleEn);
  console.log("titleRu", titleRu);
  console.log("titleUz", titleUz);
  console.log("textUz", textUz);
  console.log("textRu", textRu);
  console.log("textEn", textEn);
  console.log("titleTr", titleTr);
  console.log("titleZh", titleZh);
  console.log("textZh", textZh);
  console.log("textTr", textTr);
  console.log("author", author);
  console.log("images", picture); */


  const formData = new FormData();
  formData.append("title_en", titleEn);
  formData.append("title_ru", titleRu);
  formData.append("title_uz", titleUz);
  formData.append("text_uz", textUz);
  formData.append("text_ru", textRu);
  formData.append("text_en", textEn);
  formData.append("title_tr", titleTr);
  formData.append("title_zh", titleZh);
  formData.append("text_zh", textZh);
  formData.append("text_tr", textTr);
  formData.append("author", author);
  formData.append("images", picture);


  //POST
  const addNews = (e) => {
    e.preventDefault();
    handleOpenAdd();
    fetch(`${baseUrl}news/`, {
      method: 'POST',
      body: formData,
      headers: {
          "Authorization" : `Bearer ${token}`
      },
    })
       .then((response) => response.json())
       .then((data) => {
        if(data?.message) {
          getNews();
          handleCloseAdd();
        }
       })
       .catch((err) => {
          console.log(err.message);
       });

  }
  

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <Modal
        title="Add"
        open={open}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={addNews} id="newsForm">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <p>Add</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="titleEn">*Title En</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="titleEn"
                          onChange={(e) => setTitleEn(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="titleRu">*Title Ru</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="titleRu"
                          onChange={(e) => setTitleRu(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="titleUz">*Title Uz</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="titleUz"
                          onChange={(e) => setTitleUz(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="textUz">*Text Uz</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="textUz"
                          onChange={(e) => setTextUz(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="textRu">*Text Ru</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="textRu"
                          onChange={(e) => setTextRu(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="textEn">*Text En</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="textEn"
                          onChange={(e) => setTextEn(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="titleTr">*Title Tr</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="titleTr"
                          onChange={(e) => setTitleTr(e?.target?.value)}
                        />
                      </div>{" "}
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="titleZh">*Title Zh</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="titleZh"
                          onChange={(e) => setTitleZh(e?.target?.value)}
                        />
                      </div>{" "}
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="textZh">*Text Zh</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="textZh"
                          onChange={(e) => setTextZh(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="textTr">*Text Tr</label>
                        <input
                          type="text"
                          className="form-control mt-2 mb-2"
                          id="textTr"
                          onChange={(e) => setTextTr(e?.target?.value)}
                        />
                      </div>
                      <div className="col-lg-4 d-flex flex-column">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" onChange={(e) => setAuthor(e?.target?.value)}/>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 d-flex flex-column mt-2">
                        <label htmlFor="picture">Upload the images</label>
                        <input type="file" className="form-control" id="picture" onChange={(e) => setPicture(e?.target?.files[0])}/>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt-4">
                            <button className="btn btn-outline-primary mx-1" onClick={handleCloseAdd}>Cancel</button>
                            <button className="btn btn-primary" >Add</button>
                        </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              Add
            </button>
          </div>
          <div className="col-lg-12 pt-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Images</th>
                  <th>Name Uz</th>
                  <th>Text Uz</th>
                  <th>Author</th>
                  <th>Harakat</th>
                </tr>
              </thead>
              <tbody>
                {news &&
                  news?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          width={100}
                          src={`${baseImgUrl}${item?.news_images[0]?.["image.src"]}`}
                          height={100}
                          alt="Error"
                        />
                      </td>
                      <td>{item?.text_uz}</td>
                      <td>{item?.title_uz}</td>
                      <td>{item?.author}</td>
                      <td>
                        <button className="btn btn-outline-primary me-2">
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
    </>
  );
};

export default News;
