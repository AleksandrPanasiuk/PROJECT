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
    categories: yup
        .string('Enter Category')
});

const Semant = () => {
    const [faults, setFaults] = React.useState([])
    const [reasons, setReasons] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const formik = useFormik({
        initialValues: {
            categories: null,
            firstComplaint: null,
            secondComplaint: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let result = {}
            faults.forEach(fault=>{
                if(
                    fault.reasons.includes(values.firstComplaint) &&
                    fault.reasons.includes(values.secondComplaint) &&
                    fault.category.includes(values.categories)
                ){
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
             const res3 = await axios.get('http://localhost:3001/categories')
             setCategories(res3.data)
        }
        fetchPosts()
    },[])

    return (
        <div style={style}>
            <Card sx={{ minWidth: 275 }} style={{width:350}}>
                <CardHeader
                    title="Semantic web"
                />
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <div style={{marginTop:20}}>
                            <InputLabel id="categories-id">Reason Category</InputLabel>
                            <Select
                                fullWidth
                                labelId="categories-id"
                                id="categories"
                                name="categories"
                                label="Categories"
                                value={formik.values.categories}
                                onChange={formik.handleChange}
                                error={formik.touched.categories && Boolean(formik.errors.categories)}
                                helperText={formik.touched.categories && formik.errors.categories}
                            >
                                {categories.map((category)=>
                                    <MenuItem value={category.id} style={{marginLeft:20}}>{category.name}</MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="Complaint">Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="Complaint-1"
                                id="firstComplaint"
                                name="firstComplaint"
                                label="Second Complaint"
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
                            <InputLabel id="Complaint-2">Complaint</InputLabel>
                            <Select
                                fullWidth
                                labelId="Complaint"
                                id="secondComplaint"
                                name="secondComplaint"
                                label="Third Complaint"
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

export default Semant

