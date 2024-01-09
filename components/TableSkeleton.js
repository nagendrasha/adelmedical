import { Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const TableSkeleton = ({tableHead}) => {
    return (
        <>
            <Table container={"true"} component={Paper}>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "black" }}>
                        {
                            tableHead.map((ele,index)=>{
                                return  <TableCell key={index} align='center' sx={{ color: "white", fontSize: "16px", fontWeight: "900", cursor: "pointer" }}>
                                {ele}
                            </TableCell>
                            })
                        }
                           
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {
                             new Array(5).fill(1).map((ele, index) => {
                                {/* console.log(ele) */ }
                                return <TableRow key={index}>
                                {
                                    tableHead.map((ele,index)=>{
                                        return <TableCell key={index}  align='center' sx={{ cursor: "pointer",p:"2px" }}>
                                            <Skeleton sx={{ height: "70px",width:"90%" }} />
                                          </TableCell>
                                    })
                                }
                                          
                                     </TableRow>
                                
                            })
                            }
                    </TableBody>
                </Table>
            </Table>
        </>
    )
}

export default TableSkeleton