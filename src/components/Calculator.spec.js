import { mount } from '@vue/test-utils'
import Calculator from './Calculator.vue'

describe('Calculator.vue', () => {
  //znaci ova ti e za plus .. u globala toa e ti mozes so chat gpt da napraes ovde pojkje testooj i treba da ti projda..git
  test('clicking number buttons updates the result correctly', () => {
    const wrapper = mount(Calculator)
    wrapper.find('.number').trigger('click')
    expect(wrapper.vm.result).toBe('7')
  })
  // operator 
  test('clicking operator buttons updates the result correctly', () => {
    const wrapper = mount(Calculator)
    wrapper.find('.operator').trigger('click')
    expect(wrapper.vm.result).toBe('/')
  })
  // toa CE sto e 
  test('clicking clear button clears the result', () => {
    const wrapper = mount(Calculator, {
      data() {
        return {
          result: '123',
          calculated: false
        }
      }
    })
    wrapper.find('.clear').trigger('click')
    expect(wrapper.vm.result).toBe('')
  })

  test('clicking clear entry button clears the last entry', () => {
    const wrapper = mount(Calculator, {
      data() {
        return {
          result: '123',
          calculated: false
        }
      }
    })
    wrapper.find('.clear').trigger('click')
    expect(wrapper.vm.result).toBe('')
  })

  test('calculating a simple expression yields the correct result', () => {
    const wrapper = mount(Calculator, {
      data() {
        return {
          result: '2+3',
          calculated: false
        }
      }
    })
    wrapper.find('.equal').trigger('click')
    expect(wrapper.vm.result).toBe(5)
  })

  test('clearing the result after calculation', () => {
    const wrapper = mount(Calculator, {
      data() {
        return {
          result: '5+5',
          calculated: true
        }
      }
    })
    wrapper.find('.clear').trigger('click')
    expect(wrapper.vm.result).toBe('')
  })
})
