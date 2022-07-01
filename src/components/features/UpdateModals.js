import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../context/ContextProvider';
import Swal from 'sweetalert2';
import InputForm from './InputForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export default function UpdateModals({ status, setStatus, id }) {
    const { user } = useAuth();
    const [rows, setRows] = useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:9000/api/update-billing/${id}`, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`,
                    },
                })
                .then((res) => {
                    setRows(res.data);
                })
                .catch((err) => {
                    if (
                        err.response.status === 401 ||
                        err.response.status === 403
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.message,
                        });
                        localStorage.clear();
                    }
                });
        }
    }, [id]);

    const onSubmit = (data) => {
        axios
            .put(`http://localhost:9000/api/update-billing/${id}`, data, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                    handleClose();
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    localStorage.clear();
                }
            });
    };

    return (
        <div>
            <Button onClick={handleOpen}>Edit</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style} className='containerForm'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {rows !== null && (
                            <InputForm
                                register={register}
                                errors={errors}
                                rows={rows}
                            />
                        )}
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
