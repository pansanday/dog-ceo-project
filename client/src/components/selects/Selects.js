import React, {Component} from 'react';
import ReactDOM from 'react-dom'

import './Selects.css';

class Selects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectName: "",
            selectSubbreedName: "",

            breedArr: [],
            breedImgs: [],
            breedAndSubbreedArr: []
        }
    };

    componentDidMount() {
        fetch('/api/listAllBreedAndSubbreed')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    breedAndSubbreedArr: json,
                })
            });

        fetch('/api/listAllBreed')
            .then(res => res.json())
            .then(breedArr => {
                this.setState({breedArr}, () => console.log('listAllBreed feteched..', breedArr))
            });
    }

    changeName(e) {
        this.setState({selectName: e.target.value});
        this.state.breedAndSubbreedArr.map((item, index) => {
            if (e.target.value === item.breed) {
                console.log('selectSubbreedName is: ', item.subbreed.split(","));
                this.setState({
                    breedImgs: []
                });

                // 根据名称获取图片
                fetch('/api/getImgsByBreed/' + item.breed)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            breedImgs: data
                        });
                    });
            }
            return true;
        });
    };

    // 选择子breed名称
    changeSubbreed(e) {
        this.setState({
            breedImgs: []
        });

        // 根据名称获取图片
        fetch('/api/getImgsByBreed/' + e.target.value)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    breedImgs: data
                });
            });
    };

    render() {
        const imgs = this.state.breedImgs.map((item, index) => {
            return <img key={index} src={item} alt=''/>
        });

        const names = this.state.breedArr.map((item, index) => {
            // console.log('==>', this.state.breedArr);
            return <option key={index}>{item}</option>
        });

        const subbreeds = this.state.breedAndSubbreedArr.map((item, index) => {
            if (this.state.selectName === item.breed) {
                return item.subbreed.split(",").map((item, index) =>
                    <option key={index}>{item}</option>
                )
            }
            return true;
        });

        return (
            <div>
                <h1>Please choose dogs you like: </h1>
                <select value={this.state.selectName} onChange={this.changeName.bind(this)}>{names}</select>
                <select value={this.state.selectSubbreedName} onChange={this.changeSubbreed.bind(this)}>{subbreeds}</select>
                <div style={{display: 'flex'}}>{imgs}</div>
            </div>
        );
    }
};

ReactDOM.render(<Selects/>, document.getElementById('root'));

export default Selects;