import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import * as yup from 'yup';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
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

const Logic = () => {
    const [faults, setFaults] = React.useState([])
    const [reasons, setReasons] = React.useState([])
    const formik = useFormik({
        initialValues: {
            firstComplaint: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Click",values)
            let result = {}
            let resObj = {}
                reasons.forEach(item=>{
                if(item.id===values.firstComplaint) resObj = item
            })
            console.log(resObj)
            let findCat = {}
            if(resObj.category.length !== 1){
                if(resObj.category[0].trust > resObj.category[1].trust){
                    findCat = resObj.category[0]
                }
                else{
                    findCat = resObj.category[1]
                }
            }else{
                findCat = resObj.category[0]
            }
            faults.forEach(item=>{
                item.catTrust.forEach(cat=> {
                        if (cat.id === findCat.id && (cat.trust >= findCat.trust)) {
                            result = item
                        }
                    }
                )
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
        }
        fetchPosts()
    },[])

    return (
        <div style={style}>
            <Card sx={{ minWidth: 275 }} style={{width:350}}>
                <CardHeader
                    title="Logic"
                />
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <div style={{marginTop:20}}>
                            <InputLabel id="first-Complaint">Complaint</InputLabel>
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

export default Logic

