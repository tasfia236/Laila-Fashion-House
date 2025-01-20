import { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'
import { FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function AllUser () {
  const axiosSecure = useAxiosSecure()
  const [users, setUsers] = useState([])
  const [added, setAdded] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axiosSecure.get('auth/user')
      setUsers(data)
    }
    getUsers()
  }, [])

  const handleDeleteUser = user => {
    console.log(user)
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${user.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`manage/user/${user._id}`)
          .then(res => {
            console.log(res.data) // Logs the response data
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'User has been deleted.', 'success')
              const remaining = added.filter(added => added._id !== user._id)
              setAdded(remaining)
            }
          })
          .catch(error => {
            console.error('Error deleting user:', error)
          })
      }
    })
  }

  return (
    <div>
      <h1 className='m-10 font-bold text-2xl text-center'>All User</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead className='text-center'>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th defaultValue={0}>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users?.map(user => (
              <tr key={user._id}>
                <td>
                  <div className='avatar'>
                    <div className='w-12 h-12 mask mask-squircle'>
                      <img
                        src={user.photo}
                        alt='Avatar Tailwind CSS Component'
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className='font-bold'>{user.username}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td defaultValue={0}>{user.order}</td>
                <td>
                  <button
                    className='text-white btn btn-error btn-sm'
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
