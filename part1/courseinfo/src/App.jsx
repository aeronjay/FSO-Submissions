

const App = () => {
  const course = 'Half Stack Application Development';
  const part1 = {
    name: 'Fundamentals of React',
    exercise: 10,
  }
  const part2 = {
    name: 'using props to pass data',
    exercise: 7,
  }
  const part3 = {
    name: 'state of a component',
    exercise: 14,
  }
  console.log(part1, part2, part3);
  return (
    <div>
      <Course course = {course} />
      <Content part1 = {part1.name} exercises1 = {part1.exercise} part2 = {part2.name} exercises2 = {part2.exercise} part3 = {part3.name} exercises3 = {part3.exercise} />
      <Total exercises1 = {part1.exercise} exercises2 = {part2.exercise} exercises3 = {part3.exercise} />

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
      <Part part = {props.part1} exercise = {props.exercises1}/>
      <Part part = {props.part2} exercise = {props.exercises2}/>
      <Part part = {props.part3} exercise = {props.exercises3}/>
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
    <p>Number of Exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
  )
}



export default App
