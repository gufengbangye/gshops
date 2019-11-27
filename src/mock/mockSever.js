import Mock from 'mockjs'
import data from './data'
Mock.mock('/foods', {code: 0, data: data.foods})
Mock.mock('/rating', {code: 0, data: data.rating})
Mock.mock('/info', {code: 0, data: data.info})
Mock.mock('s', 'get', {})
