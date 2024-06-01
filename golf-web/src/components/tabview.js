export default function TabView({ contentData, ...rest }) {
    return (
        <ul>
            {contentData.map(function(s) {return (
                <li justify="between">
                    <span>{s.from}</span><span>{s.to}</span><span>{s.title}</span>
                </li>
            );
          })}
         </ul>
        
      );
};


