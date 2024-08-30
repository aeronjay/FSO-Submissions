
const Course = ({course}) => {

    return (
        <>
            <Header headerName={course.name} id={course.id} />
            <Content course={course} />
            <Total parts={course.parts} />
        </>
        
    )
}
const Header = ({headerName, id}) => <h1 key={id}>{headerName}</h1>
const Part = ({part}) => <p>{part.name} {part.exercises}</p>
const Total = ({parts}) => <p><strong>total of {parts.reduce((total, element) => total += element.exercises, 0)}  exercises</strong></p>

const Content = ({course}) => {
    const parts = course.parts
    return (
        <div>
            {
                parts.map((part) => {
                    return <Part part={part} key={part.id} />
                })
            }
        </div>
    )
}

export default Course