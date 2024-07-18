
import { Modal } from "antd";
import { useEffect, useState } from "react";

const Services = () => {
  const [serviceSource, setServiceSource] = useState([]);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const token = localStorage.getItem("accesstoken");
    const [titleEn, setTitleEn] = useState();
    const [titleRu, setTitleRu] = useState();
    const [titleUz, setTitleUz] = useState();
    const [textUz, setTextUz] = useState();
    const [textRu, setTextRu] = useState();
    const [textEn, setTextEn] = useState();

    const formData = new FormData();
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("title_uz", titleUz);
    formData.append("text_uz", textUz);
    formData.append("text_ru", textRu);
    formData.append("text_en", textEn);

  const handleOk = (id) => {
    setId(id);
    setIsDelModalOpen(true);
  };
  const handleCancel = () => {
    setIsDelModalOpen(false);
    setIsAddModalOpen(false)
  };

  const handleServiceAdd = ()=>{
    setIsAddModalOpen(true);
  }
  // GET Service Data
  const getServiceData = () => {
    fetch("https://api.dezinfeksiyatashkent.uz/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServiceSource(data?.data);
        // console.log(data?.data[0]?.image_src);
      });
  };
  useEffect(() => {
    getServiceData();
  }, []);

  //DELETE Service Data
  const delServiceData = (e) => {
    e.preventDefault();
    fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const newFaq = serviceSource.filter((item) => item.id !== id);
        setServiceSource(newFaq);
        setIsDelModalOpen(false);
      });
  };

  //POST Service Data
 const insertServiceData = (e) => {
   e.preventDefault();
   fetch(`https://api.dezinfeksiyatashkent.uz/api/faqs`, {
     method: "POST",
     body: formData,
     headers: {
       // "Content-type": "application/json; charset=UTF-8",
       Authorization: `Bearer ${token}`,
     },
   })
     .then((res) => res.json())
     .then((data) => {
       if (data?.success) {
         handleCancel();
       }
     });
 };
  return (
    <div>
      <table className="w-full border table-auto">
        <thead>
          <tr className="border bg-slate-100">
            <th className="py-2 px-3 border-r text-left">№</th>
            <th className="py-2 px-3 border-r text-left">Image</th>
            <th className="py-2 px-3 border-r text-left">Title_eng</th>
            <th className="py-2 px-3 border-r text-left">Title_uz</th>
            <th className="py-2 px-3 border-r text-left">Title_ru</th>
            <th className="py-2 px-3 border-r text-left">Title_zh</th>
            <th className="py-2 text-left pl-3">
              <button
                onClick={handleServiceAdd}
                className="border py-2 px-4 font-semibold rounded bg-blue-500 text-white "
              >
                Add Service
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceSource?.map((item, idx) => (
            <tr className="border-b" key={idx}>
              <td className="py-5 px-2"></td>
              <td className="py-5 px-2">
                <img className="w-8 h-8" src={item?.image_src} alt="" />
              </td>
              <td className="py-5 px-2">{item?.title_en}</td>
              <td className="py-5 px-2">{item?.title_uz}</td>
              <td className="py-5 px-2">{item?.title_ru}</td>
              <td className="py-5 px-2">{item?.title_zh}</td>
              <td className="py-5 px-2">
                <button
                  onClick={() => handleOk(item.id)}
                  className="border py-2 px-4 font-semibold rounded bg-red-600 text-white mr-2"
                >
                  Delete
                </button>
                <button className="border py-2 px-4 font-semibold rounded bg-blue-500 text-white">
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
            onClick={delServiceData}
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
              onClick={insertServiceData}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Services;
