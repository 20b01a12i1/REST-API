import React,{Component} from 'react'
import axios from 'axios'

class Comp extends Component{
    constructor(props){
        super(props)
        this.state={
            posts:[]
        }
    }
    // https://jsonplaceholder.typicode.com/posts

    componentDidMount(){
        axios.get('http://localhost:3001/Report')
        .then(res=>{
          this.setState({
            posts:res.data
          })
          console.log(res.data)
        })
      };
      
    render(){
        const {posts}=this.state
        return(
            <div>
                <h3>list</h3>{
                    posts.map(item => <div key={item.description}>{item.description}</div>)
                }
                
            </div>
        )
    }
}
export default Comp