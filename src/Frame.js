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

import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const style = {
    display: "flex",
    alignItems:" center",
    justifyContent: "center",
    marginTop: 50

}

const Frame = () => {
    const [faults, setFaults] = React.useState([])
    const [reasons, setReasons] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [selectedReasons, setSelectedReasons] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState([]);

    function compare(a1, a2) {
        return a1.length === a2.length && a1.every((v,i)=>v === a2[i])
    }
    const submitForm = () =>{
        let result = {}
        faults.forEach(fault=>{

            console.log(fault.reasons === selectedReasons)
            if(
                compare(fault.reasons,selectedReasons)&&
                compare(fault.category,selectedCategory)
            ){
                result = fault
            }
        })
        console.log(result)
        alert(JSON.stringify(result.name, null, 2));
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedReasons(
            value,
        );
       console.log(selectedReasons)
    };

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
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
                    title="Frame"
                />
                <form onSubmit={submitForm}>
                    <CardContent>
                        <div style={{marginTop:20}}>
                            <InputLabel id="categories-id">Fault Category</InputLabel>
                            <Select
                                fullWidth
                                labelId="categories-id"
                                id="categories"
                                name="categories"
                                label="Categories"
                                multiple
                                value={selectedCategory}
                                onChange={handleChangeCategory}
                            >
                                {categories.map((category)=>
                                    <MenuItem key={category.id} value={category.id} style={{marginLeft:20}}>
                                        <Checkbox checked={selectedCategory.indexOf(category.id) > -1} />
                                        <ListItemText primary={category.name} />
                                    </MenuItem>
                                )}
                            </Select>
                        </div>
                        <div style={{marginTop:20}}>
                            <InputLabel id="reasons">Reasons</InputLabel>
                            <Select
                                fullWidth
                                labelId="reasons"
                                id="reasons"
                                name="Reasons"
                                label="Reasons"
                                multiple
                                value={selectedReasons}
                                onChange={handleChange}
                            >
                                {reasons.map((reason) => (
                                    <MenuItem key={reason.id} value={reason.id} style={{marginLeft:20}}>
                                        <Checkbox checked={selectedReasons.indexOf(reason.id) > -1} />
                                        <ListItemText primary={reason.name} />
                                    </MenuItem>
                                ))}
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

export default Frame

