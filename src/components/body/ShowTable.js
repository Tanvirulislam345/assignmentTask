import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpdateModals from '../features/UpdateModals';
import { LocalDining } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E09483',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ShowTable({ rows, handleDelete, status, setStatus }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Billing Id</StyledTableCell>
                        <StyledTableCell align='right'>
                            Full Name
                        </StyledTableCell>
                        <StyledTableCell align='right'>Email</StyledTableCell>
                        <StyledTableCell align='right'>Phone</StyledTableCell>
                        <StyledTableCell align='right'>
                            Paid Amount
                        </StyledTableCell>
                        <StyledTableCell align='center'>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>
                                {row?._id || 'Loading...'}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row?.FullName}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row?.Email}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row?.Phone}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row?.PaidAmount}
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <UpdateModals
                                    status={status}
                                    setStatus={setStatus}
                                    id={row?._id}
                                />
                                <Button onClick={() => handleDelete(row._id)}>
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
