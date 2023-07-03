import React, { useState, useEffect } from 'react';

const groups = Array.from({ length: 16 }, (_, i) => `Group ${i + 1}`);

const App = () => {
    const initialGroups = JSON.parse(localStorage.getItem('groups')) || groups;
    const [randomGroups, setRandomGroups] = useState(initialGroups);

    const randomizeGroups = () => {
        let newGroups = [...randomGroups];
        for (let i = newGroups.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newGroups[i], newGroups[j]] = [newGroups[j], newGroups[i]];
        }
        localStorage.setItem('groups', JSON.stringify(newGroups));
        setRandomGroups(newGroups);
    }

    useEffect(() => {
        const endDateTime = new Date('2023-07-04T11:00:00'); // 4th of July, 2023 at 11:00AM local time
        function helper() {
            const now = new Date();
            if (now >= endDateTime) {
                return;
            }

            randomizeGroups();
            setTimeout(helper, 1000);
        }

        helper();
    }, []);

    return (
        <div>
            {randomGroups.map(group => <div key={group}>{group}</div>)}
        </div>
    );
}

export default App;