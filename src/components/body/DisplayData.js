import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ShowTable from './ShowTable';
import { Box } from '@mui/material';
import SearchItem from './SearchItem';
import axios from 'axios';
import NavBar from '../header/NavBar';
import { useAuth } from '../../context/ContextProvider';
import Swal from 'sweetalert2';

export default function Displaydata() {
    const { user } = useAuth();
    const [TotalAmount, setTotalAmout] = useState(0);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(null);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/billing-list?page=${page}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                const data = res.data;
                setTotalPage(Math.ceil(data.pages / 10));
                setRows(data.result);
                setTotalAmout(data.total);
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
                }
            });
    }, [status, page]);

    useEffect(() => {
        axios
            .post(`http://localhost:9000/api/billing-list`, search, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                const data = res.data;
                console.log(data);
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
                }
            });
    }, [search]);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:9000/api/delete-billing/${id}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                }
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
    };

    return (
        <Stack spacing={2} direction='column'>
            <NavBar TotalAmount={TotalAmount} />
            <Box sx={{ px: 5, my: 3 }}>
                {rows !== null && (
                    <>
                        <SearchItem
                            rows={rows}
                            setRows={setRows}
                            setStatus={setStatus}
                            status={status}
                            setSearch={setSearch}
                        />
                        <ShowTable
                            rows={rows}
                            handleDelete={handleDelete}
                            status={status}
                            setStatus={setStatus}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                my: 3,
                            }}>
                            <Pagination
                                count={totalPage}
                                variant='outlined'
                                shape='rounded'
                                onChange={(e, value) => setPage(value)}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Stack>
    );
}
