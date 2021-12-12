import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import * as yup from 'yup';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@material-ui/core/Button';

const style = {
    display: "flex",
    alignItems:" center",
    justifyContent: "center",
    marginTop: 50

}

const validationSchema = yup.object({
    firstComplaint: yup
        .string('Enter your Complaint'),
    secondComplaint: yup
        .string('Enter your Complaint'),
    thirdComplaint: yup
        .string('Enter your Complaint'),
    fourthComplaint: yup
        .string('Enter your Complaint'),
    fifthComplaint: yup
        .string('Enter your Complaint'),

});

const Prod = () => {
    const [faults, setFaults] = React.useState([])
    const [reasons, setReasons] = React.useState([])
    /*    const [categories, setCategories] = React.useState([]) */
    const formik = useFormik({
        initialValues: {
            firstComplaint: null,
            secondComplaint: null,
            thirdComplaint: null,
            fourthComplaint: null,
            fifthComplaint: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let result = {}
            faults.forEach(fault=>{
                if(
                    fault.reasons.includes(values.firstComplaint) &&
                    fault.reasons.includes(values.secondComplaint) &&
                    fault.reasons.includes(values.thirdComplaint) &&
                    fault.reasons.includes(values.fourthComplaint)&&
                    fault.reasons.includes(values.fifthComplaint)){
                    result = fault
                }
            })
            console.log(result)
            alert(JSON.stringify(result.name, null, 2));
        },
    });
    React.useEffect(()=>{
        const fetchPosts = async () =>{
            const res1 = await axios.get('http://localhost:3001/faults')
            setFaults(res1.data)
            const res2 = await axios.get('http://localhost:3001/reasons')
            setReasons(res2.data)
            /* const res3 = await axios.get('http://localhost:3001/categories')
             setCategories(res3.data)*/
        }
        fetchPosts()
    },[])

    return (
        <div style={style}>
            <Card sx={{ minWidth: 275 }} style={{width:350}}>
                <CardHeader
                    title="Productive"
                />
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <div style={{marginTop:20}}>
                            <InputLabel id="first-Complaint">First Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="first-Complaint"
                                id="firstComplaint"
                                name="firstComplaint"
                                label="First Complaint"
                                value={formik.values.firstComplaint}
                                onChange={formik.handleChange}
                                error={formik.touched.firstComplaint && Boolean(formik.errors.firstComplaint)}
                                helperText={formik.touched.firstComplaint && formik.errors.firstComplaint}
                            >
                                {reasons.map((reason)=>
                                    <MenuItem value={reason.id} style={{marginLeft:20}}>{reason.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="second-Complaint">Second Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="second-Complaint"
                                id="secondComplaint"
                                name="secondComplaint"
                                label="Second Complaint"
                                value={formik.values.secondComplaint}
                                onChange={formik.handleChange}
                                error={formik.touched.secondComplaint && Boolean(formik.errors.secondComplaint)}
                                helperText={formik.touched.secondComplaint && formik.errors.secondComplaint}
                            >
                                {reasons.map((reason)=>
                                    <MenuItem value={reason.id} style={{marginLeft:20}}>{reason.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="third-Complaint">Third Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="third-Complaint"
                                id="thirdComplaint"
                                name="thirdComplaint"
                                label="Third Complaint"
                                value={formik.values.thirdComplaint}
                                onChange={formik.handleChange}
                                error={formik.touched.thirdComplaint && Boolean(formik.errors.thirdComplaint)}
                                helperText={formik.touched.thirdComplaint && formik.errors.thirdComplaint}
                            >
                                {reasons.map((reason)=>
                                    <MenuItem value={reason.id} style={{marginLeft:20}}>{reason.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="fourth-Complaint">Fourth Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="fourth-Complaint"
                                id="fourthComplaint"
                                name="fourthComplaint"
                                label="Fourth Complaint"
                                value={formik.values.fourthComplaint}
                                onChange={formik.handleChange}
                                error={formik.touched.fourthComplaint && Boolean(formik.errors.fourthComplaint)}
                                helperText={formik.touched.fourthComplaint && formik.errors.fourthComplaint}
                            >
                                {reasons.map((reason)=>
                                    <MenuItem value={reason.id} style={{marginLeft:20}}>{reason.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="fifth-Complaint">Fifth Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="fifth-Complaint"
                                id="fifthComplaint"
                                name="fifthComplaint"
                                label="Fifth Complaint"
                                value={formik.values.fifthComplaint}
                                onChange={formik.handleChange}
                                error={formik.touched.fifthComplaint && Boolean(formik.errors.fifthComplaint)}
                                helperText={formik.touched.fifthComplaint && formik.errors.fifthComplaint}
                            >
                                {reasons.map((reason)=>
                                    <MenuItem value={reason.id} style={{marginLeft:20}}>{reason.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
};

export default Prod

