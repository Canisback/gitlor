import axios from 'axios';

import ConstantsList from './Constants';

class CardDictionary {
    
    constructor(){
        this.cardList = []
        this.cardListById = []
        
        var _this = this
        axios.get(ConstantsList.SET_URL)
          .then(res => {
            _this.cardList = res.data
            for(var i in _this.cardList)
                _this.cardListById[_this.cardList[i]["cardCode"]] = _this.cardList[i]
        })
    }
}

export default new CardDictionary();