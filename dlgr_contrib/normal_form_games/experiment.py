"""Bartlett's transmission chain experiment from Remembering (1932)."""
from dallinger.config import get_config
from dallinger.experiments import Experiment
from dallinger.networks import Empty, FullyConnected
import dallinger as dlgr

config = get_config()


def extra_parameters():

    types = {
        'custom_variable': bool,
        'num_participants': int,
    }

    for key in types:
        config.register(key, types[key])


class NormalFormGame(Experiment):
    """An one-shot economic game described by a payoff matrix."""
    num_participants = 2
    quorum = 2

    def __init__(self, session=None):
        """Call the same parent constructor, then call setup() if we have a session.
        """
        self.experiment_repeats = 2
        self.num_participants = 2
        self.initial_recruitment_size = self.num_participants
        super().__init__(session)
        if session:
            self.setup()
        self.log('initialize')

    def configure(self):
        super().configure()
        # self.custom_variable = config.get('custom_variable')
        # self.num_participants = config.get('num_participants', 1)

    def create_network(self):
        """Return a new network."""
        return FullyConnected(max_size=self.num_participants)

    def choose_network(self, networks, participant):
        # Choose first available network rather than random
        return networks[0]

    def info_post_request(self, node, info):
        self.log(f'post info: {info.origin_id} {info.contents}')
        for agent in node.neighbors():
            node.transmit(what=info, to_whom=agent)

    def create_node(self, participant, network):
        """Create a node for a participant."""
        return dlgr.nodes.Agent(network=network, participant=participant)

