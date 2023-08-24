import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { createPasteRequest, getGlobalVisitors } from "../api/pastes.api";

function MainPage() {
  const navigate = useNavigate();

  const [visits, setVisits] = useState(0);


  const numFormat = (num) => {
    return num.toLocaleString("en-US");
  }

  const getVisitors = async () => {
    const response = await getGlobalVisitors();
    const visit = numFormat(response.data.count)
    setVisits(visit);
  }

  
  useEffect(() => {
    try {
      getVisitors();
    } catch (error) {
      console.error(error);
    }
  })

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          content: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            if (values.content === "") {
              alert("The paste can't be empty!");
            } else {
              const response = await createPasteRequest(values);
              actions.resetForm();
              navigate(`/${response.data.id}`);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <div className="card-container">
            <div className="card">
              <Form className="form" onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Untitled Paste"
                  onChange={handleChange}
                  value={values.title}
                />
                <label>Content</label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Write here..."
                  onChange={handleChange}
                  value={values.content}
                ></textarea>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <div className="visits">
        <span>{visits} VISITS</span>
      </div>
    </div>
  );
}

export default MainPage;
