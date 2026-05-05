import {
  Box, RadioGroup, Radio, Typography, TextField, FormControl,
  Checkbox, FormGroup, Select, MenuItem, Button, FormLabel,
  FormControlLabel, TextareaAutosize, FormHelperText
} from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import beauty from "../assets/beauty.jpg"

export default function Form() {
  
  const initialState = {
    name: "",
    phone: "",
    email: "",
    gender: "",
    country: "",
    city: "",
    address: "",
    occasion: "",
    appointmentdate: "",
    service: [],
  };
  const [User, setUser] = useState(initialState);
  const [cities, setCities] = useState([]);
  const [frontfile, setFrontfile] = useState(null);
  const [backfile, setBackfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const countryCities = {
    India: ["Chennai", "Delhi", "Mumbai"],
    USA: ["New York", "Chicago", "Los Angeles"],
    Canada: ["aaa", "bbb", "ccc"]
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters.";
        break;
      case "phone":
        if (!value) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value)) error = "Enter a valid 10-digit phone number.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address.";
        break;
      case "gender":
        if (!value) error = "Please select a gender.";
        break;
      case "country":
        if (!value) error = "Please select a country.";
        break;
      case "city":
        if (!value) error = "Please select a city.";
        break;
      case "address":
        if (!value.trim()) error = "Address is required.";
        else if (value.trim().length < 10) error = "Min 10 characters.";
        break;
      case "service":
        if (!value || value.length === 0) error = "Select at least one service.";
        break;
      case "frontfile":
        if (!value) error = "Upload front image.";
        break;
      case "backfile":
        if (!value) error = "Upload back image.";
        break;
      case "appointmentdate":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(value);
        const maxDate = new Date("2028-01-01");
        if (selected < today) error = "Cannot be in the past.";
        else if (selected > maxDate) error = "Too far in future.";
        break;
      case "occasion":
        if (!value) error = "Select an occasion.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = () => {
    const newErrors = {};
    if (!User.name.trim()) newErrors.name = "Name is required.";
    if (!User.phone) newErrors.phone = "Phone required.";
    if (!User.email) newErrors.email = "Email required.";
    if (!User.gender) newErrors.gender = "Select gender.";
    if (!User.country) newErrors.country = "Select country.";
    if (!User.city) newErrors.city = "Select city.";
    if (!User.address.trim()) newErrors.address = "Address required.";
    if (User.service.length === 0) newErrors.service = "Select service.";
    if (!frontfile) newErrors.frontfile = "Upload front.";
    if (!backfile) newErrors.backfile = "Upload back.";
    if (!User.appointmentdate) newErrors.appointmentdate = "Select date.";
    if (!User.occasion) newErrors.occasion = "Select occasion.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...User.service, value]
      : User.service.filter((s) => s !== value);
    setUser({ ...User, service: updated });
    validateField("service", updated);
  };

  const handleFrontFile = (e) => {
    const file = e.target.files[0];
    setFrontfile(file);
    validateField("frontfile", file);
  };

  const handleBackFile = (e) => {
    const file = e.target.files[0];
    setBackfile(file);
    validateField("backfile", file);
  };

  const handleCountryChange = (event) => {
    const value = event.target.value;
    setUser((prev) => ({ ...prev, country: value, city: "" }));
    setCities(countryCities[value]);
    validateField("country", value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setUser((prev) => ({ ...prev, city: value }));
    validateField("city", value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();


    Object.keys(User).forEach(key => {
      if (key === "service") {
        formData.append("service", JSON.stringify(User.service)); 
      } else {
        formData.append(key, User[key]);
      }
    });
    formData.append("frontfile", frontfile);
    formData.append("backfile", backfile);

    try {
      const res = await axios.post("http://localhost:7001/api/appointment/add", formData,
        {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(res.data.message);
      setUser(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  const todayStr = new Date().toLocaleDateString("en-CA");

  const fieldStyle = { marginBottom: "24px" };

  return (
    <Box sx={{background:"black",backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                            url(${beauty})`, }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 700,
        margin: "0 auto",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 2,
        border: 2,
        
      }}
    >
      <Typography
        variant='h5'
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: 2,
          mb: 2
        }}
      >
        WELCOME TO SAKTHI PARLOR
      </Typography>

      <form
        onSubmit={handlesubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <div style={fieldStyle}>
          <TextField fullWidth label="Name" value={User.name}
            onChange={(e) => {
              const val = e.target.value.replace(/[^A-Za-z\s]/g, "");
              setUser({ ...User, name: val });
              validateField("name", val);
            }}
            slotProps={{htmlInput:{maxLength:20,minLength:3}}}
            error={!!errors.name} helperText={errors.name}
          />
        </div>

        <div style={fieldStyle}>
          <TextField fullWidth label="Phone" value={User.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setUser({ ...User, phone: val });
              validateField("phone", val);
            }}
            slotProps={{htmlInput:{maxLength:10}}}
            error={!!errors.phone} helperText={errors.phone}
          />
        </div>

        <div style={fieldStyle}>
          <TextField fullWidth label="Email" value={User.email}
            onChange={(e) => {
              setUser({ ...User, email: e.target.value });
              validateField("email", e.target.value);
            }}
            error={!!errors.email} helperText={errors.email}
          />
        </div>

        <div style={fieldStyle}>
          <FormControl error={!!errors.gender}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup value={User.gender}
              onChange={(e) => {
                setUser({ ...User, gender: e.target.value });
                validateField("gender", e.target.value);
              }}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="others" control={<Radio />} label="Don't want to mention" />
            </RadioGroup>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </div>

        <div style={fieldStyle}>
          <FormControl fullWidth error={!!errors.country}>
            <FormLabel style={{ marginBottom: "6px" }}>Country</FormLabel>
            <Select value={User.country} onChange={handleCountryChange}>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
            </Select>
            {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
          </FormControl>
        </div>

        <div style={fieldStyle}>
          <FormControl fullWidth error={!!errors.city}>
            <FormLabel style={{ marginBottom: "6px" }}>City</FormLabel>
            <Select value={User.city} onChange={handleCityChange}>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
            {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
          </FormControl>
        </div>

        <div style={fieldStyle}>
          <FormLabel style={{ display: "block", marginBottom: "6px" ,color:"inherit"}}>Address</FormLabel>
          <TextareaAutosize
            style={{ width: "100%", height: "100px", boxSizing: "border-box" }}
            value={User.address}
            onChange={(e) => {
              setUser({ ...User, address: e.target.value });
              validateField("address", e.target.value);
            }}
          />
          {errors.address && <FormHelperText error>{errors.address}</FormHelperText>}
        </div>

        <div style={fieldStyle}>
          <FormControl error={!!errors.service}>
            <FormLabel style={{ marginBottom: "6px" }}>Services</FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={User.service.includes("Hair Cut")} onChange={handleServiceChange} value="Hair Cut" />} label="Hair Cut" />
              <FormControlLabel control={<Checkbox checked={User.service.includes("Facial")} onChange={handleServiceChange} value="Facial" />} label="Facial" />
              <FormControlLabel control={<Checkbox checked={User.service.includes("Threading")} onChange={handleServiceChange} value="Threading" />} label="Threading" />
              <FormControlLabel control={<Checkbox checked={User.service.includes("Waxing")} onChange={handleServiceChange} value="Waxing" />} label="Waxing" />
            </FormGroup>
            {errors.service && <FormHelperText>{errors.service}</FormHelperText>}
          </FormControl>
        </div>

        <div style={fieldStyle}>
          <Button fullWidth variant="contained" component="label"sx={{background:"black"}}>
            Upload Front
            <input type="file" hidden onChange={handleFrontFile} />
          </Button>
           {frontfile && <Box mt={1}>{frontfile.name}</Box>}
          {errors.frontfile && <FormHelperText error>{errors.frontfile}</FormHelperText>}
        </div>

        <div style={fieldStyle}>
          <Button fullWidth variant="contained" component="label" sx={{background:"black"}}>
            Upload Back
            <input type="file" hidden onChange={handleBackFile} />
          </Button>
           {backfile && <Box mt={1}>{backfile.name}</Box>}
          {errors.backfile && <FormHelperText error>{errors.backfile}</FormHelperText>}
        </div>

        <div style={fieldStyle}>
          <TextField
            fullWidth type="date"
            value={User.appointmentdate}
            onChange={(e) => {
              setUser({ ...User, appointmentdate: e.target.value });
              validateField("appointmentdate", e.target.value);
            }}
            slotProps={{htmlInput:{min:todayStr}}}
            error={!!errors.appointmentdate}
            helperText={errors.appointmentdate}
          />
        </div>

        <div style={fieldStyle}>
          <FormControl fullWidth>
            <FormLabel style={{ marginBottom: "6px" }}>Occasion</FormLabel>
            <Select value={User.occasion}
              onChange={(e) => {
                setUser({ ...User, occasion: e.target.value });
                validateField("occasion", e.target.value);
              }}>
              <MenuItem value="Wedding">Wedding</MenuItem>
              <MenuItem value="Party">Party</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
            </Select>
            {errors.occasion && <FormHelperText error>{errors.occasion}</FormHelperText>}
          </FormControl>
        </div>

        <Button style={fieldStyle} type="submit" variant="contained" sx={{ borderRadius: "2rem" ,background:"black"}}>
          Submit
        </Button>

      </form>
    </Box>
    </Box>
  );
}