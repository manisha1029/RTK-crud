import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../features/usersDetailSlice";
import { Button, Card, Form } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import type { Users } from "./CreateForm";

function AllPosts() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, searchPost } = useSelector(
    (state: RootState) => state.users
  );
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleClose = () => setShowModal(false);

  function handleView(id: string) {
    setShowModal(true);
    setUserId(id);
  }

  function handleDelete(id: string) {
    dispatch(deleteUser(id));
  }

  const filteredUsers = useMemo(() => {
    return users?.filter((user: Users) =>{
      const mathesSearch = searchPost ? user.name.toLowerCase().includes(searchPost.toLowerCase()) : user;
      const matchesGender = gender ? user.gender === gender : user;
      return mathesSearch && matchesGender;
    })
  }, [users, searchPost, gender])


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <Form className="d-flex justify-content-center mt-5">
        <Form.Check
          type="radio"
          label="All"
          name="gender"
          id="formHorizontalRadios"
          className="mb-2 me-3"
          checked={gender === ""}
          onChange={() => setGender("")}
        />
        <Form.Check
          type="radio"
          label="Male"
          name="gender"
          value="male"
          id="formHorizontalRadios1"
          className="mb-2 me-3"
          checked={gender === "male"}
          onChange={() => setGender("male")}
        />
        <Form.Check
          type="radio"
          label="Female"
          name="gender"
          value="female"
          id="formHorizontalRadios2"
          className="mb-2"
          checked={gender === "female"}
          onChange={() => setGender("female")}
        />
      </Form>
      <div className="d-flex flex-wrap gap-3 justify-content-center mt-5">
          {filteredUsers?.length > 0 ? filteredUsers
            .map((user: Users) => {
            return (
              <Card style={{ width: "18rem" }} key={user.id}>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.email}
                  </Card.Subtitle>
                  <Card.Text>{user.gender}</Card.Text>

                  <Button
                    className="btn btn-primary me-3"
                    onClick={() => handleView(user.id)}
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/edit-user/${user.id}`}
                    className="btn btn-success me-3"
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          }) : <h1 className="text-center mt-5">No users found</h1>}
        <CustomModal
          show={showModal}
          handleClose={handleClose}
          userId={userId}
        />
      </div>
    </>
  );
}

export default AllPosts;
