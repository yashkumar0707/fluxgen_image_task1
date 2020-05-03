
// // export default App;
// import React, { useRef, Component } from 'react';

// //import { CSVReader } from 'react-papaparse';
// //import './App.css';
// import ImageUpload from './image/imageUpload'
// import Comp from './component/comp'
// //const filePickerRef=useRef(null);
// class App extends Component {

//   constructor(props) {
//     super(props);
//     var arr = [
//       [123, 124],
//       [1, 2],
//       [23, 43],
//       [35, 60],
//       [45, 98],
//       [22, 87],
//       [99, 77],
//       [0, 0],
//       [500, 500]
//     ]
//     this.state = {
//       image: null,
//       csvfile: undefined,
//       arr: arr
//     };

//     this.onImageChange = this.onImageChange.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }


//   handleSubmit = event => {
//     event.preventDefault();
//     //filePickerRef.current.click();
//   }

//   onImageChange = event => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       this.setState({
//         image: URL.createObjectURL(img)
//       });
//     }
//   };

//   handleChange = event => {
//     this.setState({
//       csvfile: event.target.files[0]
//     });
//   };

//   //Not sure if below function needs backend to parse csv file
//   /*
//     importCSV = () => {
//       const { csvfile } = this.state;
//       Papa.parse(csvfile, {
//         complete: this.updateData,
//         header: true
//       });
//     }; 

//     updateData(result) {
//       var data = result.data;
//       console.log(data);
//     }
//   */
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h1>WebApp Wireframe</h1>
//         </div>
//         <br />
//         <div>
//           <input type="file" name="myImage" accept=".jpeg,.jpg,.png" onChange={this.onImageChange} />
//           <button className="button1" type="submit" onClick={this.handleSubmit}>Upload Image</button>
//         </div>
//         {/* <ImageUpload
//           id="image"
//           // onInput={inputHandler}
//           errorText="Please provide an image."
//         /> */}
//         {/* <div>
//           <h4>Preview</h4>
//          <img className="image" src={this.state.image} />
//         </div> */}
//         <br />
//         <br />
//         {/* <div>
//           <input
//             className="csv-input"
//             type="file"
//             accept=".csv"
//             ref={input => {
//               this.filesInput = input;
//             }}
//             name="file"
//             placeholder={null}
//             onChange={this.handleChange}
//           />
//           <button type="submit" className="button1" onClick={this.handleSubmit}>Upload Pixel CSV</button>
//         </div> */}
//         <div>
//           {this.state.image && <Comp arr={this.state.arr} img={this.state.image}></Comp>}
//         </div>
//         <div>
//           <button type="submit" className="button1" onClick={this.handleSubmit}>Generate</button>
//         </div>

//       </div>

//     );
//   }
// }

// export default App;


// export default App;
import React, { useRef, Component } from 'react';

//import { CSVReader } from 'react-papaparse';
import './App.css';
import ImageUpload from './image/imageUpload'
import Comp from './component/comp'
//const filePickerRef=useRef(null);
class App extends Component {

  constructor(props) {
    super(props);
    var arr = [
      [123, 124],
      [1, 2],
      [23, 43],
      [35, 60],
      [45, 98],
      [22, 87],
      [99, 77],
      [0, 0],
      [500, 500]
    ]
    this.state = {
      image: null,
      csvfile: undefined,
      arr: [],
      generate: false
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit = event => {
    event.preventDefault();
    this.setState({ generate: true })
    //filePickerRef.current.click();
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData = (result) => {
    var data = result.data;
    console.log(parseInt(data[0].x));
    var i
    for (i = 0; i < data.length - 1; i++) {
      this.state.arr[i] = [parseInt(data[i].x), parseInt(data[i].y)]
    }
    console.log(this.state.arr)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>WebApp Wireframe</h1>
        </div>
        <br />
        <div>
          <input type="file" name="myImage" accept=".jpeg,.jpg,.png" onChange={this.onImageChange} />
          <button className="button1" type="submit" onClick={this.handleSubmit}>Upload Image</button>
        </div>
        {/* <ImageUpload
          id="image"
          // onInput={inputHandler}
          errorText="Please provide an image."
        /> */}
        {/* <div>
          <h4>Preview</h4>
         <img className="image" src={this.state.image} />
        </div> */}
        <br />
        <br />
        <div>
          <input
            className="csv-input"
            type="file"
            accept=".csv"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <button type="submit" className="button1" onClick={this.importCSV}>Upload Pixel CSV</button>
        </div>
        <br />
        <br />
        {this.state.image && this.state.generate && <Comp arr={this.state.arr} img={this.state.image}></Comp>}
        <div>
          <button type="submit" className="button1" onClick={this.handleSubmit}>Generate</button>
        </div>

      </div>

    );
  }
}

export default App;
