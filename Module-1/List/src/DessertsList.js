function DessertsList(props) {

  const desserts = props.data.sort((a, b) => {
    return a.calories - b.calories
  }).filter((item) => {
    return item.calories < 600
  })

  return (
    <ul>
      {desserts.map((item) => (
        <li key={item.name}>{`${item.name} - ${item.calories} cal`}</li>
      ))}
    </ul>
  )

}

export default DessertsList;
