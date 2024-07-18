import { message, Modal } from "antd";
import "../../index.css";
import { useEffect, useState } from "react";

const Faq = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [id, setId] = useState(null);
  const [titleEn, setTitleEn] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleUz, setTitleUz] = useState();
  const [textUz, setTextUz] = useState();
  const [textRu, setTextRu] = useState();
  const [textEn, setTextEn] = useState();
  const [data, setData] = useState({
    titleEn: "",
    title_ru: "",
    title_uz: "",
    text_uz: "",
    text_ru: "",
    text_en: "",
  });
    const formData = new FormData();
  formData.append("title_en", titleEn);
  formData.append("title_ru", titleRu);
  formData.append("title_uz", titleUz);
  formData.append("text_uz", textUz);
  formData.append("text_ru", textRu);
  formData.append("text_en", textEn);
   
  //Token
  const token = localStorage.getItem("accesstoken");


  const handleOk = (id) => {
    setId(id);
    setIsDelModalOpen(true);
  };
  const handleCancel = () => {
    setIsDelModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditOpen(false);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (item)=>{
    setId(item.id)
    setIsEditOpen(true)
    // console.log(item);
    setData({
      ...data,
      title_en: item.titleEn,
      title_ru: item.title_ru,
      title_uz: item.title_uz,
      text_uz: item.text_uz,
      text_ru: item.text_ru,
      text_en: item.text_en,
    });
  }

  // GET request
  const getData = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        setDataSource(data?.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);


  // DELETE request
  const delTableData = (e) => {
    e.preventDefault();
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const newFaq = dataSource.filter((item) => item.id !== id);
        setDataSource(newFaq);
        setIsDelModalOpen(false);
      });
  };

  // POST request 
  const insertData = (e) => {
    e.preventDefault();
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          handleCancel()
        }  
      });
  };

  // PUT request 
  const editFaq =(e)=>{
e.preventDefault()
fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  method: "PUT",
  body:formData
}).then(res=>res.json()).then(res=>{
  if (res.success) {
    handleCancel();
    message.success("Sucessfully")
  }else{
    message.error("Failed")
  }
}
).catch((err)=>console.log(err))
  }

  return (
    <>
      <table className="w-full border table-fixed">
        <thead>
          <tr className="border bg-slate-100">
            <th className="py-2 px-3 border-r text-left">№</th>
            <th className="py-2 px-3 border-r text-left">Name</th>
            <th className="py-2 px-3 text-left">Actions</th>
            <th className="py-2 text-right ">
              <button
                onClick={handleAdd}
                className="border py-2 px-4 font-semibold rounded bg-blue-500 text-white mr-4"
              >
                Add faq
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((item, idx) => (
            <tr className="border-b" key={idx}>
              <td className="py-5 px-2">{item?.title_ru}</td>
              <td className="py-5 px-2">{item?.title_en}</td>
              <td className="py-5 px-2">
                <button
                  onClick={() => handleOk(item.id)}
                  className="border py-2 px-4 font-semibold rounded bg-red-600 text-white mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="border py-2 px-4 font-semibold rounded bg-blue-500 text-white"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Delete"
        footer={null}
        open={isDelModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete?</p>
        <div className="text-end">
          <button
            onClick={delTableData}
            className="border py-2 px-4 bg-red-600 rounded text-white font-medium"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="border-2 py-2 px-4 ml-2 rounded font-medium"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        title="ADD FAQ"
        footer={null}
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <div className="mt-8 my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in English
            </label>
            <div className="">
              <input
                onChange={(e) => setTitleEn(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in Russian
            </label>
            <div className="">
              <input
                onChange={(e) => setTitleRu(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in Uzbek
            </label>
            <div className="">
              <input
                onChange={(e) => setTitleUz(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in Uzbek
            </label>
            <div className="">
              <input
                onChange={(e) => setTextUz(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in Russian
            </label>
            <div className="">
              <input
                onChange={(e) => setTextRu(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in English
            </label>
            <div className="">
              <input
                onChange={(e) => setTextEn(e?.target?.value)}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className="w-full flex my-8">
            <button
              onClick={handleCancel}
              className="border-2 rounded-md font-medium py-2 w-1/2 mr-2"
            >
              Cancel
            </button>
            <button
              className="border rounded-md bg-blue-500 text-white font-medium py-2 w-1/2"
              type="submit"
              onClick={insertData}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Edit"
        footer={null}
        open={isEditOpen}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <form action="" onSubmit={editFaq}>
          <div className="mt-8 my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in English
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, title_en: e.target.value })}
                value={data.title_en}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in Russian
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, title_ru: e.target.value })}
                value={data.title_ru}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Title in Uzbek
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, title_uz: e.target.value })}
                value={data.title_uz}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in Uzbek
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, text_uz: e.target.value })}
                value={data.text_uz}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in Russian
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, text_ru: e.target.value })}
                value={data.text_ru}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className=" my-2">
            <label htmlFor="inputId">
              <span className="text-red-600">*</span> Text in English
            </label>
            <div className="">
              <input
                onChange={(e) => setData({ ...data, text_en: e.target.value })}
                value={data.text_en}
                type="text"
                className="w-full border py-1 px-2 rounded mt-1"
                id="inputId"
                required
              />
            </div>
          </div>
          <div className="w-full flex my-8">
            <button
              onClick={handleCancel}
              className="border-2 rounded-md font-medium py-2 w-1/2 mr-2"
            >
              Cancel
            </button>
            <button
              className="border rounded-md bg-blue-500 text-white font-medium py-2 w-1/2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Faq;
