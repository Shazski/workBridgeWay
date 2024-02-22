
const JobCategogyBtn = ({category}:{category:string}) => {
    const color = {
        engineering:'blue-600',
        design:'orange-600',
        sales:'green-600',
        marketing:'red-600',
        finance:'yellow-600',
        technology:'violet-600',
        hr:'lightgreen-600',
        business:'teal-600'
    }
    return (
            <>
                <h4 className={`border text-teal-60000 text-sm text-${color[category]} border-gray-400  px-2 py-1 rounded-xl`}>{category}</h4>
            </>
    )
}

export default JobCategogyBtn
