<template>
  <div id="app">
    <h2>Calculator App</h2>
    <div class="calculator">
      <input type="text" class="result" :value="result" readonly />
      <div class="buttons">
        <button class="number" v-for="num in [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.', '00']" :key="num" @click="handleClick(num)">{{ num }}</button>
        <button class="operator" v-for="operator in ['/', '*', '-', '+']" :key="operator" @click="handleOperatorClick(operator)">{{ operator }}</button>
        <button class="clear" @click="handleClear">C</button>
        <button class="clear" @click="handleClearEntry">CE</button>
        <button class="equal" @click="calculate()">=</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: '',
      calculated: false
    }
  },
  methods: {
    handleClick (value) {
      if (this.calculated) {
        this.result = value
        this.calculated = false
      } else {
        this.result += value
      }
    },
    handleClear () {
      this.result = ''
      this.calculated = false
    },
    handleClearEntry () {
      if (this.result && this.result.length > 0) {
        this.result = this.result.slice(0, -1)
        if (this.result.length === 0) {
          this.handleClear()
        }
      } else {
        this.handleClear()
      }
    },
    handleOperatorClick (operator) {
      if (/[+*/-]$/.test(this.result)) {
        this.result = this.result.slice(0, -1) + operator
      } else {
        this.result += operator
      }
      this.calculated = false
    },
    calculate () {
      try {
        // eslint-disable-next-line no-eval
        let evaluatedResult = eval(
          this.result.replace(/(^|[^0-9])0+(\d+)/g, '$1$2')
        )
        if (
          evaluatedResult === Infinity ||
          evaluatedResult === -Infinity
        ) {
          throw new Error('Divide by zero error')
        }
        this.result = Number.isFinite(evaluatedResult)
          ? evaluatedResult
          : 'Error'
        this.calculated = true
      } catch (error) {
        if (error.message === 'Divide by zero error') {
          this.result = 'Error: Divide by zero'
        } else {
          this.result = 'Error'
        }
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}
.calculator {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
.result {
  width: 90%;
  padding: 10px;
  font-size: 20px;
  text-align: right;
  margin-bottom: 10px;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
button {
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  outline: none;
}
.number, .operator {
  background-color: #f0f0f0;
}
.clear, .equal {
  background-color: #ff6666;
  color: #fff;
}
button:hover {
  background-color: #ddd;
}
.equal {
  grid-column: span 2;
}
</style>
