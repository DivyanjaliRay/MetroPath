const graph = {
  'New Delhi': { 'Chandni Chowk': 5, 'Lal Quila': 3, 'Connaught Place': 2, 'Rajiv Chowk': 1 },
  'Chandni Chowk': { 'New Delhi': 5, 'Kashmere Gate': 2 },
  'Lal Quila': { 'New Delhi': 3, 'Jama Masjid': 1 },
  'Connaught Place': { 'New Delhi': 2, 'Karol Bagh': 4, 'Hauz Khas': 7, 'Punjabi Bagh': 5 },
  'Karol Bagh': { 'Connaught Place': 4, 'Rajouri Garden': 2, 'Rohini': 9 },
  'Rajouri Garden': { 'Karol Bagh': 2, 'Punjabi Bagh': 3 },
  'Rohini': { 'Karol Bagh': 9, 'Hauz Khas': 6, 'Dwarka': 8, 'Dilshad Garden': 8, 'Gurugram': 7, 'Noida': 9 },
  'Hauz Khas': { 'Connaught Place': 7, 'Rohini': 6, 'Dwarka': 8 },
  'Dwarka': { 'Hauz Khas': 8, 'Rohini': 8, 'Gurugram': 3, 'Noida': 6 },
  'Dilshad Garden': { 'Rohini': 8 },
  'Gurugram': { 'Rohini': 7, 'Dwarka': 3, 'Noida': 2 },
  'Noida': { 'Rohini': 9, 'Dwarka': 6, 'Gurugram': 2, 'Vaishali': 3, 'Mayur Vihar': 4 },
  'Punjabi Bagh': { 'Connaught Place': 5, 'Rajouri Garden': 3 },
  'Kashmere Gate': { 'Chandni Chowk': 2, 'Shastri Park': 2 },
  'Shastri Park': { 'Kashmere Gate': 2, 'Seelampur': 3 },
  'Seelampur': { 'Shastri Park': 3, 'Welcome': 2 },
  'Welcome': { 'Seelampur': 2, 'Dilshad Garden': 5 },
  'Jama Masjid': { 'Lal Quila': 1, 'Delhi Gate': 2 },
  'Delhi Gate': { 'Jama Masjid': 2, 'ITO': 1 },
  'ITO': { 'Delhi Gate': 1, 'Mandi House': 2 },
  'Mandi House': { 'ITO': 2, 'Rajiv Chowk': 3 },
  'Rajiv Chowk': { 'Mandi House': 3, 'New Delhi': 1 }
};

function findShortestPath(source, destination) {
  const queue = [{ path: [source], cost: 0 }];
  const visited = new Set();  

  while (queue.length > 0) {
      const { path, cost } = queue.shift();
      const current = path[path.length - 1];

      if (current === destination) {
          return { path, cost };
      }

      if (!visited.has(current)) {
          visited.add(current);
          const neighbors = graph[current] || {};
          for (const neighbor in neighbors) {
              if (!visited.has(neighbor)) {
                  const newPath = [...path, neighbor];
                  const newCost = cost + neighbors[neighbor];
                  queue.push({ path: newPath, cost: newCost });
              }
          }
          queue.sort((a, b) => a.cost - b.cost);
      }
  }

  return { path: [], cost: Infinity };
}

document.addEventListener('DOMContentLoaded', function () {
  const routeForm = document.getElementById('routeForm');
  const shortestRouteElement = document.getElementById('shortestRoute');
  const totalCostElement = document.getElementById('totalCost');
  const overlay = document.getElementById('overlay');

  const sourceSelect = document.getElementById('source');
  const destinationSelect = document.getElementById('destination');
  const stations = Object.keys(graph);

  stations.forEach(station => {
      const option1 = document.createElement('option');
      option1.value = station;
      option1.textContent = station;
      sourceSelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = station;
      option2.textContent = station;
      destinationSelect.appendChild(option2);
  });

  routeForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const source = sourceSelect.value;
      const destination = destinationSelect.value;
      if (source && destination) {
          const { path, cost } = findShortestPath(source, destination);
          shortestRouteElement.textContent = `Path: ${path.join(' -> ')}`;
          totalCostElement.textContent = `Total Travel Time: ${cost} minutes`;
          overlay.style.display = 'flex';
      }
  });

  overlay.addEventListener('click', function () {
      overlay.style.display = 'none';
  });
});
