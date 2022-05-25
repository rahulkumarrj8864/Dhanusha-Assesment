import React,{useState,useEffect} from 'react'
import { Table,Container,Row,Col,Button,ButtonGroup,Form,Navbar, Card } from 'react-bootstrap'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

    let time = new Date();
        let dates = time.getDate()
            let month = time.getMonth()
            let year = time.getFullYear()
            let hour = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();
            let am_pm = 'AM';
          
          if(hour > 12) {
            hour -= 12;
            am_pm = 'PM';
          }
          if(hour == 0) {
            let hr = 12;
            am_pm = 'AM';
          }
          hour = hour < 10 ? '0' + hour : hour;
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ?  '0' + sec : sec;
          
          let currentTime =  dates+"/"+month+"/"+year+", "+hour + ":" + min + ":" + sec + " " + am_pm;
          


const initialState = {
    genre: '',
    description: '',
    image: '',
    date: currentTime,
}

const App = () => {
    const api = "http://localhost:5000/music"
    const [data,setData] = useState([])
    const [state,setState] = useState(initialState)
    const {genre,description,image} = state

    useEffect(() =>{
        loadUsers()
    },[])
    const loadUsers = async () => {
        const response = await axios.get(api)
        setData(response.data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!genre || !description || !image) {
            toast.error("Please fill all data 🤨")
        }else {
            axios.post(api,state)
            setState({genre:'', description: '', image: "",date:currentTime}) 
            toast.success("Success 😎")
            window.location.reload(true);
        }
        setTimeout(() => loadUsers(),500)
    }
    const handleChange = async(e) => {
        let {name , value} = e.target
        setState({...state, [name]:value})
    }
    const [cons, setCons] = useState()
    const handleSelectDelete = (e) => {
        console.log(e.target.id);
        if (window.confirm("Are you wanted to delete that user ")){
              axios.delete(`${api}/${cons}`);
               toast.success("Deleted Successfully");
               window.location.reload(true)
            }
            setTimeout (() => loadUsers(), 500);
    
    }
    const handleSelected = (e,id) => {
        console.log(e.target.id);
        setCons(e.target.id)
    }
    const handleAllDelete = (id) => {
        
            // if (window.confirm("Are you wanted to delete that user ")){
            //   axios.delete(`${api}`);
            //    toast.success("Deleted Successfully");
            //     setTimeout (() => loadUsers(), 500);
            // }
            console.log(Number(cons));
    }
  return (
    <>
        <ToastContainer/>
        <Container className='mt-4'>
            <Row>
                <Col md={4}>
            <Card className='p-3'>
            <h3 className='text-center'>Add Data</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-2'>
                            <Form.Label style={{textAlign:"left"}}>Genre</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Genre'
                                name='genre'
                                value={genre}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label style={{textAlign:"left"}}>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Description'
                                name='description'
                                value={description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control id='files' type="file" name='image' onChange={handleChange} value={image}/>
                        </Form.Group>
                        <div className='d-grip gap mt-2'>
                            <Button type='submit'>Add</Button>
                        </div>
                    </Form>
                    </Card>
                </Col>
                <Col md={8}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th className='text-center'>S.No</th>
                                <th className='text-center'>Genre</th>
                                <th className='text-center'>Description</th>
                                <th className='text-center'>image</th>
                                <th className='text-center'>Added On</th>
                                {/* <th className='text-center'>Hello</th> */}
                            </tr>
                        </thead>
                        {data && data.map((item,index) => (
                            <tbody key={index}>
                                <tr>
                                    <td className='text-center'>{index+1}</td>
                                    <td className='text-center'>{item.genre}</td>
                                    <td className='text-center'>{item.description}</td>
                                    <td className='text-center'>{item.image}</td>
                                    <td className='text-center'>{item.date}</td>
                                    <td className='text-center'><Form.Check type='checkbox' id={item.id} value={item.id} onChange={handleSelected}/></td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <div className='d-flex'>
                    <Button type='button' className='btn btn-primary me-2' onClick={handleSelectDelete}>Select Delete</Button>
                    <Button type='button' className='btn btn-danger ml-2' onClick={handleAllDelete}>Delete All</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default App