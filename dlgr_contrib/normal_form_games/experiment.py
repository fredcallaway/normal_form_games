"""Bartlett's transmission chain experiment from Remembering (1932)."""
from dallinger.config import get_config
from dallinger.experiments import Experiment
from dallinger.networks import Empty

config = get_config()


def log(*args):
    with open('log', 'a+') as f:
        print(*args, file=f, flush=True)

def extra_parameters():

    types = {
        'custom_variable': bool,
        'num_participants': int,
    }

    for key in types:
        config.register(key, types[key])


class NormalFormGame(Experiment):
    """An one-shot economic game described by a payoff matrix."""
    num_participants = 3

    def __init__(self, session=None):
        """Call the same parent constructor, then call setup() if we have a session.
        """
        self.experiment_repeats = 5
        super().__init__(session)
        if session:
            self.setup()

        log('this is my message')

    def configure(self):
        super().configure()
        self.experiment_repeats = 1
        self.custom_variable = config.get('custom_variable')
        self.num_participants = config.get('num_participants', 1)

    def create_network(self):
        """Return a new network."""
        return Empty(max_size=self.num_participants)

    def info_post_request(self, node, info):
        pass
        # log('post info', node, info)
