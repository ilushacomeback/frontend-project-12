import axios from "axios";
import { useFormik } from "formik";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import postMessage from "../utils/postMessage";

const FormSendMessage = () => {
  const channelId = useSelector((state) => state.chatReducer.activeChannelId);
  const token = useSelector((state) => state.authReducer.token);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: ({ body }) => {
      const dataLocalStorage = localStorage.getItem("user");
      const username = JSON.parse(dataLocalStorage).username;
      const data = { body, channelId, username };
      postMessage(axios, token, data);
    },
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup className="has-validation">
        <Form.Control
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <Button
          type="submit"
          className="btn btn-group-vertical"
          disabled={formik.values.body.length < 0}
        >
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormSendMessage;