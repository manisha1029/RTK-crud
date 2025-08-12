import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import { useDispatch } from "react-redux";
import { createUser } from "../features/usersDetailSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../app/store";

export interface Users {
    id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
}

function CreateForm() {
    const [users, setUsers] = useState<Users>({
        id: '',
        name: '',
        email: '',
        age: 0,
        gender: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createUser(users));
        navigate('/all-posts');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsers({...users, [e.target.name]: e.target.value});
    }

  return (
    <div className="mt-5">
      <Form className="w-50 mx-auto border p-5 rounded-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={users.name} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail" onChange={handleChange}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={users.email} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter age" name="age" value={users.age} onChange={handleChange}/>
        </Form.Group>
        <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              id="formHorizontalRadios1"
              className="mb-2"
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="female"
              id="formHorizontalRadios2"
              className="mb-2"
              onChange={handleChange}
            />
        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
    </div>
  );
}

export default CreateForm;
