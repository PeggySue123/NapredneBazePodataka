using Cassandra;

namespace CassandraDataProvider
{
    class SessionManager
    {
        public static ISession session;

        public static ISession GetSession()
        {
            if (session == null)
            {
                Cluster cluster = Cluster.Builder().AddContactPoint("127.0.0.1").Build();
                session = cluster.Connect("turisticka_agencija");
            }

            return session;
        }
    }
}
