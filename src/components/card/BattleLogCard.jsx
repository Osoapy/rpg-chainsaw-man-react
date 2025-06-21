import './BattleLogCard.scss';

const BattleLogCard = ({ battleStats }) => {
    return (
        <div className="card">
            <div className="tools">
                <div className="circle">
                    <span className="red box"></span>
                </div>
                <div className="circle">
                    <span className="yellow box"></span>
                </div>
                <div className="circle">
                    <span className="green box"></span>
                </div>
            </div>
            <div className="card__content">
                <h1>LOG DE BATALHAS</h1>
                <pre>{JSON.stringify(battleStats, null, 2)}</pre>
            </div>
        </div>
    );
}

export default BattleLogCard;