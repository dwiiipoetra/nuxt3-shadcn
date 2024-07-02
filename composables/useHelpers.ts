export default function useHelpers () {
    function excerptWord (str:string) {
        let strArray = str.split(' ')
        let joinedWord = strArray.slice(0, 15).join(' ')

        return joinedWord
    }

    function currencyFormat(numb:number) {
        const formatted = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(numb)
        
        return formatted
    }

    return {
        excerptWord, currencyFormat
    }
}