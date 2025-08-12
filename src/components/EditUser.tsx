import  { useEffect, useMemo, useState } from 'react'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/usersDetailSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import type { Users } from './CreateForm';


function EditUser() {
    const {userId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const {users} = useSelector((state: RootState) => state.users);
    const user = useMemo(() => users?.find((u: Users) => u.id === userId), [users, userId]);

    const [currentUser, setCurrentUser] = useState<Users>({
        id: '',
        name: '',
        email: '',
        age: 0,
        gender: '',
      });
    
      useEffect(() => {
        if (user) setCurrentUser(user);
      }, [user]);

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(currentUser, 'currentUser');
        e.preventDefault();
        dispatch(updateUser(currentUser));
        navigate('/all-posts');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser({...currentUser, [e.target.name]: e.target.value});
    }
    
  
  return (
    <div className="mt-5">
    <Form className="w-50 mx-auto border p-5 rounded-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={currentUser?.name} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail" onChange={handleChange}>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={currentUser?.email} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupAge">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Enter age" name="age" value={currentUser?.age} onChange={handleChange}/>
      </Form.Group>
      <Form.Check
            type="radio"
            label="Male"
            name="gender"
            value="male"
            id="formHorizontalRadios1"
            className="mb-2"
            onChange={handleChange}
            checked={currentUser?.gender === 'male'}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value="female"
            id="formHorizontalRadios2"
            className="mb-2"
            onChange={handleChange}
            checked={currentUser?.gender === 'female'}
          />
      <Button variant="primary" type="submit">
        Update User
      </Button>
    </Form>
  </div>
  )
}

export default EditUser