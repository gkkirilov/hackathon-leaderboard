export const useTeams = () => {
  const teamColors = [
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'yellow', name: 'Yellow', color: 'bg-yellow-500' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'neon', name: 'Neon', color: 'bg-lime-400' },
    { id: 'black', name: 'Black', color: 'bg-gray-900' },
    { id: 'white', name: 'White', color: 'bg-gray-100' }
  ]

  const getTeamColor = (teamId) => {
    const team = teamColors.find(t => t.id === teamId)
    return team ? team.color : 'bg-gray-500'
  }

  const getTeamName = (teamId) => {
    const team = teamColors.find(t => t.id === teamId)
    return team ? team.name : 'Unknown'
  }

  return {
    teamColors,
    getTeamColor,
    getTeamName
  }
}