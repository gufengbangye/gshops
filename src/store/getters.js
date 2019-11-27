export default{
  totalPrice (state) {
    return state.cartList.reduce((preTotal, food) => { return preTotal + food.price * food.count }, 0)
  },
  totalCount (state) {
    return state.cartList.reduce((preTotal, food) => {
      return food.count + preTotal
    }, 0)
  }
}
