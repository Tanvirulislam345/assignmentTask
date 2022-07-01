import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
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

const inputStyle = {
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '10px 3px',
    width: '100%',
};
export default function BillAdd({ status, setStatus, rows, setRows }) {
    const { user } = useAuth();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setRows([data, ...rows]);
        axios
            .post(`http://localhost:9000/api/add-billing`, data, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                    reset();
                    handleClose();
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                });
            });
    };

    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>
                Add New Bill
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style} className='containerForm'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputForm register={register} errors={errors} />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
