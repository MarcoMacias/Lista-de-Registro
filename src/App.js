import React, { useEffect, useState } from 'react';
import './App.css';


function Item({ item, handleDel }) {

  const { userId, id, title } = item;

  return <>
    <tr >
      <td>{userId}</td>
      <td>{id}</td>
      <td>{title}</td>
      <td>
        <button className='red' onClick={ e => handleDel(id)}>Excluir</button>
        </td>
    </tr>
  </>
}


function Registers({ list = [], handleDel }) {

  const [order, setOrder] = useState(1);
  const [columnOrder, setColumnOrder] = useState('title');
  const [filter, setFilter] = useState('');

  const handleOrder = fieldName => {
    setOrder(-order);
    setColumnOrder(fieldName);
  }

  list = list.sort((a, b) => {
    return a[columnOrder] < b[columnOrder] ? -order : order;
  })

  if (filter) {
    const exp = eval(`/${filter.replace(/[^\d\w]+/, '.*')}/i`);

    list = list.filter(item => exp.test(item.title))
  }
  const handleFilter = e => {
    setFilter(e.target.value);
  }

  return <div>
    <input placeholder='Pesquisar' onChange={handleFilter} />
    <table>
      <thead>
        <tr>
          <th>ID do usuário</th>
          <th onClick={e => handleOrder('id')}>ID</th>
          <th onClick={e => handleOrder('title')}>Título</th>
        </tr>
      </thead>

      <tbody>
        {
          list.map(
            item => 
            <Item item={item} key={item.id} handleDel={handleDel} />
            )
        }
      </tbody>
    </table>
  </div>
}

function App() {

  let [list, setList] = useState([]);

  const handleDel = id => {
    setList(list.filter(item => item.id !== id));
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setList(json))
  }, [])

  return <div>
    <Registers list={list} handleDel={handleDel} />
  </div>
}

export default App;