import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import {  useMemo } from 'react';
import type { Users } from './CreateForm';

interface CustomModalProps {
    show: boolean;
    handleClose: () => void;
        userId: string;
}

function CustomModal({show, handleClose, userId}: CustomModalProps) {
    const {users} = useSelector((state: RootState) => state.users);
    const user = useMemo(
        () => users.find((u: Users) => u.id === userId),
        [users, userId]
      );
    
    if (!user) {
        return null;
    }

  const { name, email, age, gender } = user;
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Email: {email}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;