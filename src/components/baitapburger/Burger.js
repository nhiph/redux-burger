import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Burger.css';
import {BurgerReducer} from '../../reducers/BurgerReducer';
import {rootReducer} from '../../reducers/RootReducer';

class Burger extends Component {

    showBreadMid = () => {
        let {burger} = this.props;
        //CACH 1:  
        // let content = []
        // for(let propsBurger in burger){
                // letbreadMid = [];
                // for(let i=0; i< burger[propsBurger]; i++){
                // breadMid.push(<div className={propsBurger} key={index}></div>)}
                // content.push(breadMid);
        //     // console.log(propsBurger, burger[propsBurger]); lay key va value tuong ung
        //  } return content;
        
        //CACH 2: Object.entries(burger): tra ve cac thuoc tinh la cac array con, dung map boc tach
        // thanh cac phan tu array []
        // duyet qua key & value tung mang [propsBurger, value]
        return Object.entries(burger).map(([propsBurger, value], index) => {
            // console.log(propsBurger, value);
            let breadMid = [];
            for(let i=0; i< value; i++){
                breadMid.push(<div className={propsBurger} key={index}></div>)
            }
            return breadMid;
        })
    }

    showMenu = () => {
        let {menu, burger} = this.props;
        return Object.entries(menu).map(([propsMenu, price], index) => {
            return (
                <tr key={index}>
                        <td>{propsMenu}</td>
                        <td>
                            <button 
                                className="btn btn-warning mr-3"
                                onClick={() => this.props.addBreadMid(propsMenu,1)}
                            >+</button>
                            {burger[propsMenu]} 
                            {/* Lay so luong burger theo cac thanh phan */}
                            <button 
                                className="btn btn-warning ml-3"
                                onClick={() => this.props.addBreadMid(propsMenu,-1)}
                            >-</button>
                        </td>
                        <td>{price}</td>
                        <td>{ burger[propsMenu]*price }</td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div className="container">
                <h3 className="text-success">BÀI TẬP BURGER CYBERSOFT</h3>
                <div className="row">
                    <div className="col-7">
                        <h3 className="text-center">Your Burger</h3>
                        <div className="breadtop"></div>
                        {this.showBreadMid()}
                        <div className="breadBottom"></div>
                    </div>
                    <div className="col-5">
                    <h3 className="text-info">Chọn thức ăn yêu thích</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Thức ăn</td>
                                <td>Số lượng</td>
                                <td>Giá</td>
                                <td>Thành tiền</td>
                            </tr>
                            {this.showMenu()}
                        </thead>
                        <tfoot>
                            <tr>
                                <td colSpan="2"></td>
                                <td>Tổng tiền</td>
                                <td>{this.props.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        burger: state.BurgerReducer.burger,
        menu: state.BurgerReducer.menu,
        total: state.BurgerReducer.total

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBreadMid: (propsBurger, amount) => {
            const action = {
                type: 'ADD_BREADMID',
                propsBurger,
                amount
            }
            dispatch(action);
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Burger);
