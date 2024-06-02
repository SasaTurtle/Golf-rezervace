export default function TabView({ contentData,  ...rest }) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
    return (
        <>
       <table class="table">
        <thead>
            <tr>
            <th scope="col">Název</th>
            <th scope="col">Od</th>
            <th scope="col">Do</th>
            <th scope="col">Délka (hodin)</th>
            </tr>
        </thead>
        <tbody>
            
            {contentData.map(function(s) {return (
                <tr>
                    <td>{s.title}</td><td>{new Date(s.from).toLocaleDateString('cs-CZ',options)}</td><td>{new Date(s.to).toLocaleDateString('cs-CZ',options)}</td>
                    <td>{(new Date(s.to)-new Date(s.from))/ 36e5}</td>
                </tr>
            );
          })}
            
        </tbody>
        </table>
        </> 
      );
};


