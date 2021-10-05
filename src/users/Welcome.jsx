import React, {Component} from 'react';
import Register from './Register';
class Welcome extends Component {

    constructor() {
        super()

        this.state = {
            isLoading: true
        }
    }
     
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isLoading: false
            })
        }, 9000)
    }
    render(){

        if(this.state.isLoading){
            return(
              <div className="container mt-5">
                  <h5 className="text-danger text-center">Verifying your account please wait....</h5>
              </div>
            )
        }else{
            return(
            <Register/>
            )
        }

    }
}

export default Welcome;