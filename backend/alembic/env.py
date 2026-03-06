from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

from app.core.config import settings
from app.db.session import Base  # Base Declarative pour metadata

# Import models so Base.metadata is populated (autogenerate / schema checks).
from app.models.user import User  # noqa: F401
from app.models.site_page import SitePage  # noqa: F401
from app.models.ui_library import UiLibrary  # noqa: F401
from app.models.app_project import AppProject  # noqa: F401
from app.models.llm_user_setting import LlmUserSetting  # noqa: F401

# Objet de configuration Alembic
config = context.config

# Injection de l’URL de la base depuis les settings
config.set_main_option("sqlalchemy.url", str(settings.database_url))

# Configuration du logging via alembic.ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata utilisée pour l'autogénération
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Exécuter les migrations en mode 'offline'."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Exécuter les migrations en mode 'online'."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
