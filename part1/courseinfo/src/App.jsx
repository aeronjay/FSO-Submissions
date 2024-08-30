

const App = () => {
  const course = {
    name: 'Half Stack Application Development', 
    parts : [
      {
        name:'Fundamentals of React',
        exercise :10
      },
      {
        name:'using props to pass data',
        exercise :7
      },
      {
        name:'state of a component',
        exercise :14
      },
    ]
  }
  return (
    <div>
      <Course course = {course.name} />
      <Content parts= {course.parts} />
      <Total parts = {course.parts} />

    </div>
  )
}
const Course = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}
const Content = (props) => {

  return(
    <>
      <Part part = {props.parts[0].name} exercise = {props.parts[0].exercise}/>
      <Part part = {props.parts[1].name} exercise = {props.parts[1].exercise}/>
      <Part part = {props.parts[2].name} exercise = {props.parts[2].exercise}/>
    </>
  )
  

}
const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
const Total = (props) => {
  return(
    <p>Number of Exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise} </p>
  )
}



export default App
