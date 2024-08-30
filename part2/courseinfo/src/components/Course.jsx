
const Course = ({course}) => {

    return (
        <>
            <Header headerName={course.name} id={course.id} />
            <Content course={course} />
        </>
        
    )
}
const Header = ({headerName, id}) => <h1 id={id}>{headerName}</h1>
const Part = ({part}) => <p>{part.name} {part.exercises}</p>

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